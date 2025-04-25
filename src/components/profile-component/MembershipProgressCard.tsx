import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface StatisticItem {
  _id: string;
  totalUsers: number;
}

export default function MembershipProgressCard({
  data,
}: {
  data: StatisticItem[] | null;
}) {

  const tierMap = new Map<string, { name: string, color: string; imgPath: string }>([
    ['none', { name: "None", color: '#9DC4DA', imgPath: '/img/Membership_tier/none.png' }],
    ['bronze', { name: "Bronze",  color: '#752D0F', imgPath: '/img/Membership_tier/bronze.png' }],
    ['silver', { name: "Silver", color: '#0098EF', imgPath: '/img/Membership_tier/silver.png' }],
    ['gold', { name: "Gold", color: '#EF9D00', imgPath: '/img/Membership_tier/gold.png' }],
    ['platinum', { name: "Platinum", color: '#DD55FC', imgPath: '/img/Membership_tier/platinum.png' }],
    ['diamond', { name: "Diamond", color: '#3069D6', imgPath: '/img/Membership_tier/diamond.png' }],
    ['null', { name: "Etc.", color: '#C6B68F', imgPath: '/img/Membership_tier/none.png' }]
  ]);

  console.log('MembershipProgressCard data:', data);

  return data ? (
    <div className="rounded-2xl shadow-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Membership - Stats</h3>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="50%" height={200}>
            <PieChart>
                <Pie
                data={data
                  .filter((entry) => entry._id !== null) // Skip entries with null _id
                  .map((entry) => ({
                  name: entry._id,
                  value: entry.totalUsers,
                  }))}
                dataKey="value"
                innerRadius={80}
                outerRadius={100}
                paddingAngle={5}
                >
                  <Label
                    position="center"
                    content={() => (
                        <>
                        <text
                          x="50%" y="35%"
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{ fontSize: '16px', fill: '#333', fontWeight: 'bold' }}
                        >
                          Total
                        </text>
                        <text
                          x="50%"
                          y="55%"
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{ fontSize: '56px', fill: '#333', fontWeight: 'bold' }}
                        >
                          {data 
                          .filter((entry) => entry._id !== null) // Skip entries with null _id
                          .reduce((sum, entry) => sum + entry.totalUsers, 0)}
                        </text>
                        </>
                    )}
                  />

                {data
                  .filter((entry) => entry._id !== null) // Skip entries with null _id
                  .map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={tierMap.get(entry._id)?.color || '#C6B68F'}
                  />
                  ))}
                </Pie>
            </PieChart>
          </ResponsiveContainer>

            <ul className="text-sm space-y-1">
            {data
              .slice()
              .filter((entry) => entry._id !== null)
              .sort((a, b) => b.totalUsers - a.totalUsers) // Sort data by totalUsers in descending order
              .map((entry, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span
                className="w-3 h-3 inline-block rounded-full"
                style={{
                  backgroundColor: tierMap.get(entry._id)?.color || '#C6B68F',
                }}
                ></span>
                <span style={{
                  color: tierMap.get(entry._id)?.color || '#C6B68F',
                  fontWeight: 'bolder',}}>
                    {entry._id === null ? "Etc." : tierMap.get(entry._id)?.name || "No name Provided"}
                </span>
              </li>
              ))}
            </ul>

            <ul className="text-sm space-y-1">
            {data
              .slice()
              .filter((entry) => entry._id !== null)
              .sort((a, b) => b.totalUsers - a.totalUsers) // Sort data by totalUsers in descending order
              .map((entry, index) => (
              <li key={index} className="flex items-center space-x-2"> 
                <span className="ml-auto">{entry.totalUsers}</span>
              </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="rounded-2xl shadow-md p-6 flex items-center justify-center h-full">
      <p className="text</Pie>-gray-500">No data available</p>
    </div>
  );
}
