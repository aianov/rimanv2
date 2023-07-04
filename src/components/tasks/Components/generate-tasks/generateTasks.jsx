import React, { useState } from 'react';
import tasks from '../../tasks.module.scss';

export const GenerateTasks = () => {
    const [containerStates, setContainerStates] = useState({
        Var1: false, Var2: false, Var3: false, Var4: false, Var5: false, Var6: false, Var7: false, Var8: false,
    });

    const [containerStates2, setContainerStates2] = useState({
        Var1: false, Var2: false, Var3: false, Var4: false, Var5: false, Var6: false, Var7: false, Var8: false,
    });

    const [containerStates3, setContainerStates3] = useState({
        Var1: false, Var2: false, Var3: false, Var4: false, Var5: false, Var6: false, Var7: false, Var8: false,
    });

    const [containerStates4, setContainerStates4] = useState({
        Var1: false, Var2: false, Var3: false, Var4: false, Var5: false, Var6: false, Var7: false, Var8: false,
    });

    const handleClick = (variable) => {
        setContainerStates((prevContainerStates) => ({
            ...prevContainerStates,
            [variable]: !prevContainerStates[variable],
        }));
    };

    const handleClick2 = (variable) => {
        setContainerStates2((prevContainerStates) => ({
            ...prevContainerStates,
            [variable]: !prevContainerStates[variable],
        }));
    };

    const handleClick3 = (variable) => {
        setContainerStates3((prevContainerStates) => ({
            ...prevContainerStates,
            [variable]: !prevContainerStates[variable],
        }));
    };

    const handleClick4 = (variable) => {
        setContainerStates4((prevContainerStates) => ({
            ...prevContainerStates,
            [variable]: !prevContainerStates[variable],
        }));
    };

    const setGeneric = () => {
        console.log(containerStates)
        console.log(containerStates2)
        console.log(containerStates3)
        console.log(containerStates4)
    }

    return (
        <>
            <div className={`${tasks.rightbottom} df fdc w100 cw`}>
                <div className={`${tasks['rightbottom-top']} w100`}>
                    <div className={`${tasks.top} df jcsb w100`}>
                        <p className='tac w50'>Укажи параметры и нажми на кнопку</p>
                        <div className={`${tasks.topbtn} df jcc aic w50`}>
                            <div className={`${tasks.btn} df jcc aic cp`}>
                                Создать
                            </div>
                        </div>
                    </div>
                    <div className={`${tasks['rightbottom-bottom']} w100`}>
                        <p className='w100 tac'>Вы можете выбрать один из заранее созданых вариантов. Они обновляются каждую неделю. Варианты отсортированны по сложности и достоверности, чем больше номер - тем сложнее.</p>
                    </div>
                </div>
            </div>
            <div className={`${tasks.rightmid} cw df w100`}>
                <div className={`${tasks.tasksleft} w50`}>
                    <div className={`${tasks.title} df jcc w100`}>
                        <p className='tac'>ЕГЭ:</p>
                    </div>
                    <div className={`${tasks.content} w100`}>
                        {Object.entries(containerStates).map(([variable, isClicked]) => (
                            <div
                                key={variable}
                                className='filters-midleft-content'
                                onClick={() => handleClick(variable)}
                                style={{ background: isClicked ? 'rgba(217, 217, 217, 0.1)' : 'none' }}
                            >
                                <p>Вариант {variable.slice(3)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${tasks.tasksright} w50`}>
                    <div className={`${tasks.title} df jcc w100`}>
                        <p className='tac'>ЕГЭ:</p>
                    </div>
                    <div className={`${tasks.content} w100`}>
                        {Object.entries(containerStates2).map(([variable, isClicked]) => (
                            <div
                                key={variable}
                                className='filters-midleft-content'
                                onClick={() => handleClick2(variable)}
                                style={{ background: isClicked ? 'rgba(217, 217, 217, 0.1)' : 'none' }}
                            >
                                <p>Вариант {variable.slice(3)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <select name="variants">
                        <option value="1" selected>Варианты</option>
                    </select> */}
            </div>
            <div className={`${tasks.rightfooter} cw df w100`}>
                <div className={`${tasks.tasksleft} w50`}>
                    <div className={`${tasks.title} df jcc w100`}>
                        <p className='tac'>ВПР:</p>
                    </div>
                    <div className={`${tasks.content} w100`}>
                        {Object.entries(containerStates3).map(([variable, isClicked]) => (
                            <div
                                key={variable}
                                className='filters-midleft-content'
                                onClick={() => handleClick3(variable)}
                                style={{ background: isClicked ? 'rgba(217, 217, 217, 0.1)' : 'none' }}
                            >
                                <p>Вариант {variable.slice(3)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${tasks.tasksright} w50`}>
                    <div className={`${tasks.title} df jcc w100`}>
                        <p className='tac'>Итоговая:</p>
                    </div>
                    <div className={`${tasks.content} w100`}>
                        {Object.entries(containerStates4).map(([variable, isClicked]) => (
                            <div
                                key={variable}
                                className='filters-midleft-content'
                                onClick={() => handleClick4(variable)}
                                style={{ background: isClicked ? 'rgba(217, 217, 217, 0.1)' : 'none' }}
                            >
                                <p>Вариант {variable.slice(3)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <select name="grade">
                        <option value="1" selected>10 Класс</option>
                    </select> */}
            </div>
        </>
    )
}