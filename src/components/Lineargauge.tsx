"use client";

import React, { useState, useEffect, useMemo, Fragment, useRef } from "react";
import { AgGauge } from "ag-charts-react";
import { AgLinearGaugeOptions } from "ag-charts-enterprise";
import "ag-charts-enterprise";
import getUser from "@/libs/Auth/getUser";
import getUserProfile from "@/libs/Auth/getUserProfile";

export default function ChartExample({
  token,
  uid,
}: {
  token: string;
  uid?: string;
}) {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await (uid ? getUser(token, uid) : getUserProfile(token));
        const user = userProfile.data;
        const membershipPoints = user?.membershipPoints || 0;
        setPoints(membershipPoints);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchData();
  }, [token, uid]);

  const options = useMemo<AgLinearGaugeOptions>(() => ({
    type: "linear-gauge",
    direction: "horizontal",
    // cornerRadius: 99,
    // cornerMode: 'container',
    padding: {
      top: 20,
      bottom: 20,
      left: 60,
      right: 60,   // ← plenty of room for the label
    },
    label: {
      enabled: true,
      placement: "bar-inside-end",
      avoidCollisions: true,
      fontSize: 15,
      fontWeight: "bold",
      color: "#000000",
    },
    
    value: points,
    scale: {
      min: 0,
      max: 750,
      label: { enabled: false },
      // fill: '#ffffff',
    },
    
    //thinkness: 100,
    bar: {
      fills: [
        { color: "#bbbbbb", stop: 50 },
        { color: "#C17547", stop: 125 },
        { color: "#AFBCCA", stop: 250 },
        { color: "#EFBF04", stop: 500 },
        { color: "#BA55D3", stop: 750 },
        { color: "#ffffff", stop: 800 },
      ],
      fillMode: "discrete",
      //thickness: 100,
    },
    segmentation: {
      enabled: true,
      interval: { values: [0, 50, 125, 250, 500, 755] },
      spacing: 3,
    },
    
    targets: [
      { value: 0,   text: "None",     placement: "before" },
      { value: 50,  text: "Bronze",   placement: "before" },
      { value: 125, text: "Silver",   placement: "before" },
      { value: 250, text: "Gold",     placement: "before" },
      { value: 500, text: "Platinum", placement: "before" },
      { value: 750, text: "Diamond",  placement: "before" },
      { value: 0, shape: "line", size: 50, placement: "middle", strokeWidth: 3 },
      { value: 50, shape: "line", size: 50, placement: "middle", strokeWidth: 3 },
      { value: 125, shape: "line", size: 50, placement: "middle", strokeWidth: 3 },
      { value: 250, shape: "line", size: 50, placement: "middle", strokeWidth: 3 },
      { value: 500, shape: "line", size: 50, placement: "middle", strokeWidth: 3 },
      { value: 750, shape: "line", size: 50, placement: "middle", strokeWidth: 3 },
      { 
        value: points, text: "You're Here", shape: "triangle", placement: "after", fill: "white", strokeWidth: 2, spacing: 4 
      },
      { 
        value: points, 
        text: `${points} points`, 
        shape: "triangle", 
        placement: "after", 
        fill: "transparent", 
        strokeWidth: 0, 
        spacing: 20 
      }
    ],
  }), [points]);

  return (
    <Fragment>
      <div className=" w-">
        <AgGauge options={options} />
      </div>
    </Fragment>
  );
}

