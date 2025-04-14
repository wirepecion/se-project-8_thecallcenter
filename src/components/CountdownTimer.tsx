import { useEffect, useState } from 'react';

export default function CountdownTimer({ duration }: { duration: number }) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div>
            <p className="text-gray-400 mt-4">
                Expires in{' '}
                <span style={{ color: 'red' }}>
                    {minutes}:{seconds.toString().padStart(2, '0')}
                </span>{' '}
                minutes
            </p>
        </div>
    );
}
