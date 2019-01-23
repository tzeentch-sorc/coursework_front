import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'

var stompClient = null;
const handlers =[];

export function connectWS() {
    const socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        //setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/price', message=> {
            handlers.forEach(handler => JSON.parse(message.body));
        });
    });
}

export function addHandler(handler) {
    handlers.push(handler);
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

export function sendMessage(message) {
    stompClient.send("/app/bet", {}, JSON.stringify(message));
}