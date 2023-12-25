"use client"

import { useEffect, useRef, useState } from "react";
import { FullMessageType } from "../../../types/index";
import useConversation from "../../../hooks/useConversation";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "../../../libs/pusher";
import { find } from "lodash";

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
    initialMessages,
}) => {

    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(() => {
        pusherClient.subscribe(conversationId)
        bottomRef?.current?.scrollIntoView()

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)

            setMessages((current) => {
                if(find(current, {id: message.id})){
                    return current
                }
                return [...current, message]
            })
            bottomRef?.current?.scrollIntoView()
        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current.map((currentMessage) => {
                if(currentMessage.id === newMessage.id)
                {
                    return newMessage
                }

                return currentMessage
            }))
        }

        pusherClient.bind("messages:new", messageHandler)
        pusherClient.bind("message:update", updateMessageHandler)

        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind("messages:new", messageHandler)
            pusherClient.unbind("message:update", updateMessageHandler)
        }

    }, [conversationId])

    return ( 
        <div className="flex-1 overflow-y-auto">

            {messages.map((message, index) => (
                <MessageBox 
                    isLast={index===messages.length-1}
                    key={message.id}
                    data={message}
                />
            ))}

            <div ref={bottomRef} className="pt-24"/>
        </div>
     );
}
 
export default Body;