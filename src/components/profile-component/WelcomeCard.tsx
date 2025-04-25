import Image from 'next/image';

export default function WelcomeCard({name} : {name:string}) {
  return (
    <div className="p-4 py-8 bg-blue-600 text-white rounded-2xl shadow-md">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Hello, {name}!</h2>
            <p className="mb-10 text-sm max-w-sm">
              The Most Seamless And Secure Way To Book Unique Hotel Experiences Around The World.
            </p>
            <button className="px-4 py-2 rounded-md font-medium shadow-sm bg-white text-blue-600 hover:bg-gray-100">Admin</button>
          </div>
          <img src="/img/greeting_img.png" alt="Avatar" className="w-48 h-48 object-contain" />
        </div>
      </div>
  );
}