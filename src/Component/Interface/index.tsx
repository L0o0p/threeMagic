import { CloseOutlined } from "@ant-design/icons";
import { useAtom } from "jotai"
import { positionAtom, selectedComponentAtom, store, Store, StoreKey } from "../../store"
import styles from './style.module.scss'

export const Interface = () => {
    const [position, setPosition] = useAtom(positionAtom)
    const buttonList: StoreKey[] = ['table', 'chair', 'door'];
    const [, setComponents] = useAtom(selectedComponentAtom);
    const checkList: Store = store; // 使用 Store 类型
    const handleClick = (item: string) => {
        console.log('点击了按钮:', item);
        if (item in checkList) {
            setComponents(prevComponents => {
                // 确保 prevComponents 是一个对象，如果不是，使用空对象作为默认值
                const safePrevComponents = prevComponents || {};

                // 这里假设您想要更新的是整个components对象
                const newComponents = { ...safePrevComponents, ...checkList[item], position: position };

                console.log('当前提交信息是：id：', checkList[item].id, 'url：', checkList[item].url, newComponents);
                return newComponents;
            });
        }
    };

    return (
        <div style={{ overflow: 'hidden' }}>
            <div className={styles.container}

            >
                <div className={styles.closeLine} >
                    <div className={styles.closeBox} >
                        <CloseOutlined />
                    </div>
                </div>
                <div className={styles.title}>
                    Object Position
                </div>

                <div className={styles.inputBlock}>
                    <label>x</label>
                    <input
                        type="text"
                        value={position.x}
                        onChange={(e) => setPosition({ ...position, x: parseFloat(e.target.value) })}
                    />
                </div>
                <div className={styles.inputBlock}>
                    <label>y</label>
                    <input
                        type="text"
                        value={position.y}
                        onChange={(e) => setPosition({ ...position, y: parseFloat(e.target.value) })}
                    />
                </div>
                <div className={styles.inputBlock}>
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
}



