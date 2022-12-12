import React from 'react';
import {v4} from 'uuid';
import { Flashmessage } from './Flashmessage';

export const FlashProvider = ({message}) =>{
    const notifications = [
        {
            id:v4(),
            type:'Success',
            message:message

        }
    ]
    return (
        <div>
        </div>
    )
}
