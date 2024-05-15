import { CloseOutlined } from "@ant-design/icons";
import { useAtom } from "jotai"
import { materialAtom, positionAtom, selectedComponentAtom, store, Store, StoreKey } from "../../store"
import styles from './style.module.scss'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Menu, Space } from 'antd';

export const Interface = () => {


    return (
        <div className={styles.container}>
            <CloseWindows />
            <WindowsTitle titleText={'Object Position'} />
            <PositionSetting />
            <MaterialSetting />
            <PressBottun />
        </div>
    )
}


const CloseWindows = () => (
    <div className={styles.closeLine} >
        <div className={styles.closeBox} >
            <CloseOutlined />
        </div>
    </div>
)

interface WindowsTitleProps {
    titleText: string;
}
const WindowsTitle: React.FC<WindowsTitleProps> = ({ titleText }) => (
    <div className={styles.title}>
        {titleText}
    </div>
);


const PositionSetting = () => {
    const [position, setPosition] = useAtom(positionAtom)
    const info = [
        { label: 'x', value: position.x, onChangeItem: (e) => setPosition({ ...position, x: parseFloat(e.target.value) }) },
        { label: 'y', value: position.y, onChangeItem: (e) => setPosition({ ...position, y: parseFloat(e.target.value) }) },
        { label: 'z', value: position.z, onChangeItem: (e) => setPosition({ ...position, z: parseFloat(e.target.value) }) }
    ]
    return (
        <div className={styles.positionSetting}>
            {info.map((item) => (
                <div className={styles.inputBlock}>
                    <label>{item.label}</label>
                    <input
                        type="text"
                        value={item.value}
                        onChange={item.onChangeItem}
                    />
                </div>
            ))}

        </div>
    )
}

const PressBottun = () => {
    const buttonList: StoreKey[] = ['table', 'chair', 'door'];
    const [position] = useAtom(positionAtom)
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
        <div>
            {buttonList.map((item) => (
                <button
                    key={item}
                    onClick={() => handleClick(item)}
                    children={item}
                />
            ))}
        </div>
    )
}

const MaterialSetting = () => {
    const [material, setMaterial] = useAtom(materialAtom);

    const handleMenuClick = (event) => {
        setMaterial(parseInt(event.key, 10)); // 将 key 字符串转换为整数，并设置为 material 值
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="0">
                <div>default material</div>
            </Menu.Item>
            <Menu.Item key="1">
                <div>changed material</div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" disabled>
                more material...(disabled now)
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a onClick={e => e.preventDefault()}>
                <Space>
                    🎨 {material === 0 ? "Default Material" : "Changed Material"}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};

export default MaterialSetting;