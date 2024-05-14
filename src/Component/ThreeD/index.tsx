import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { positionAtom, selectedComponentAtom } from "../../store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const ThreeD = () => {
    const [components, setComponents] = useAtom(selectedComponentAtom);

    return (
        <Canvas>
            <ambientLight intensity={10} />
            <spotLight position={[10, 10, 10]} angle={0.5} intensity={1} castShadow penumbra={1} />
            <OrbitControls />
            <PerspectiveCamera
                makeDefault
                position={[4.713, 2.615, 5.215]}
                rotation={[-26.63, 38.94, 17.49]}
                fov={50}
                near={0.1}
                far={100000}
            />
            {/* <Instance info={components} /> */}
            <Scene />
            <gridHelper
                args={[20, 20, 0xff0000]}
            />
        </Canvas>
    )
}


const Scene = () => {
    // 初始渲染列表，带有位置数据
    const renderList = [
        { a: { id: 'a', position: { x: 0, y: 0, z: 0 } } },
        { b: { id: 'b', position: { x: 1.5, y: 0, z: 0 } } }
    ];
    const [render, setRender] = useState(renderList);
    const [components] = useAtom(selectedComponentAtom);

    useEffect(() => {
        if (components && components.position) {
            const updateRender = [...render];
            updateRender.push({ [components.id]: components });
            setRender(updateRender);
        } else {
            console.error("Component missing or invalid position data");
        }
    }, [components]);

    return (
        <group>
            {
                render.map((obj, index) => {
                    const key = Object.keys(obj)[0];
                    const component = obj[key];
                    // 安全地访问 position，如果不存在则使用默认值
                    const { x = 0, y = 0, z = 0 } = component.position || {};

                    return (
                        <Text
                            key={key + [x, y, z]}
                            children={component.id}
                            onClick={() => console.log('obj:', obj)}
                            position={[x, y, z]} // 使用组件的位置数据
                        />
                    )
                })
            }
        </group>
    );
}

export default Scene;