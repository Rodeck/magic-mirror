import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:5000')

const InputComponent = ({onClick}) => {

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        console.log(socket);
        socket.on('connect', () => {
            console.log("Connected to buttons socket");
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('button', (data) => {
            console.log(`Button ${data} pressed`);
            onClick(data);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('button');
        };
    });

    return (
        <div>
        </div>
    );
}

export default InputComponent;