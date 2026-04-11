import { useEffect } from "react";
import { getSocket } from '../services/socket';
import { useAuth } from '../store/hooks/useAuth';

export default function RealtimeSync() {

    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            return;
        }
        const socket = getSocket();

        socket.connect();

        socket.on('connect', () => {
            console.log('Connected', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected');
        });


        // socket.on('challengeCreated', (data) => {
        //     console.log('Realtime event:', data);
        // });

        return () => {
            socket.disconnect();
        }
    }, [user]);

    return null;
}