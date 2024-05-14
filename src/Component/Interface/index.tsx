// import { useAtom } from "jotai"
// import { selectedComponentAtom } from "../../store"

// export const Interface = () => {
//     const buttonList = ['table', 'chair', 'door']
//     const [components, setComponents] = useAtom(selectedComponentAtom);
//     const handleClick = (item: string) => {
//         console.log(item)
//         const updatedcomponents = components.map(component => {
//             if (component.name === item) {
//                 return {
//                     ...component,
//                     num: component.num + 1,
//                 };
//             }
//             return component;
//         });
//         setComponents(updatedcomponents)
//         console.log(components)
//     }

//     return (
//         buttonList.map((item) => (
//             <button
//                 key={item}
//                 onClick={() => handleClick(item)}
//                 children={item}
//             />
//         ))
//     )
// }

import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAtom } from "jotai"
import { selectedComponentAtom } from "../../store"
import styles from './style.module.scss'

export const Interface = () => {
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
    const buttonList = ['table', 'chair', 'door']
    const [components, setComponents] = useAtom(selectedComponentAtom);
    const handleClick = (item: string) => {
        console.log(item)
        const updatedcomponents = components.map(component => {
            if (component.name === item) {
                return {
                    ...component,
                    num: component.num + 1,
                };
            }
            return component;
        });
        setComponents(updatedcomponents)
        console.log(components)
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <div className={styles.container}

            >
                <div
                    className={styles.in}
                    style={{
                        // backgroundColor: 'red',
                        justifyContent: 'end',
                        display: 'flex',
                        width: '100%',
                    }}
                >
                    <div style={{
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer'
                    }}
                    // onClick={() => { setInput(!input) }}
                    >
                        <CloseOutlined />
                    </div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Object Position
                </div>
                <div style={{ display: 'flex', gap: '10px', }}>
                    <label>x</label>
                    <input
                        type="text"
                        value={position.x}
                        onChange={(e) => setPosition({ ...position, x: parseFloat(e.target.value) })}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', }}>
                    <label>y</label>
                    <input
                        type="text"
                        value={position.y}
                        onChange={(e) => setPosition({ ...position, y: parseFloat(e.target.value) })}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', }}>
                    <label>z</label>
                    <input
                        type="text"
                        value={position.z}
                        onChange={(e) => setPosition({ ...position, z: parseFloat(e.target.value) })}
                    />
                </div>

                <div>
                    {buttonList.map((item) => (
                        <button
                            key={item}
                            onClick={() => handleClick(item)}
                            children={item}
                        />
                    ))}
                </div>
            </div>

        </div >
    )
    // }
}



