import React, { useState } from 'react'
import task from './tasksItem.module.scss'

import { FiCopy, } from 'react-icons/fi'
import { IoMdAddCircleOutline, } from 'react-icons/io'
import { TfiReload, } from 'react-icons/tfi'

export const TasksItem = ({ item, key }) => {
    const [answer, setAnswer] = useState('');

    const answerHandler = (e) => {
        setAnswer(e)
    }
    return (
        <div key={key} className={`${task.container} df fdc aic w100 cw`}>
            <div className={`${task.item} w100`}>
                <div className={`${task.bar} df jcsb aic w100`}>
                    <div className={task.left}>
                        <p>Задание {item.text}</p>
                    </div>
                    <div className={`${task.right} df`}>
                        <FiCopy size={23} className='cp' />
                        <IoMdAddCircleOutline size={26.5} className='cp' />
                        <TfiReload size={22} className='cp' />
                    </div>
                </div>
                <div className={`${task.middle} w100`}>
                    <div className={`${task.image} df jcc aic w100`}>
                        {
                            item.error
                                ?
                                <h1 style={{ textAlign: "center" }}>IMAGE ERROR</h1>
                                :
                                <img src={item.image} alt='#' />
                        }
                    </div>
                </div>
                <div className={`${task.bottom} df jcsb aic w100`}>
                    <div className={task.left}>
                        <input
                            type="text"
                            placeholder='Ответ:'
                            className='cw'
                            maxLength={100}
                            value={answer}
                            onChange={e => answerHandler(e.target.value)}
                        />
                    </div>
                    <div className={task.right}>
                        <p>Сложность: ???%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}