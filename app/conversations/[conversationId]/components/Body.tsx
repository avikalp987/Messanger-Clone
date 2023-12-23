"use client"

import { useEffect, useRef, useState } from "react";
import { FullMessageType } from "../../../types/index";
import useConversation from "../../../hooks/useConversation";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
    initialMessages,
}) => {

    const [messages, setMessages] = useState(initialMessages)
    const bottemRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
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

            <div ref={bottemRef} className="pt-24"/>
        </div>
     );
}
 
export default Body;