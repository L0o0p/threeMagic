import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { selectedComponentAtom } from "../../store";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const ThreeD = () => {

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

export type RenderItem = {
    [key: string]: {
        uniqueId: number;
        id: string;
        position: {
            x: number;
            y: number;
            z: number;
        };
        url: string;
    } | undefined;
};
const Scene = () => {
    const [render, setRender] = useState([]);
    const [components, setComponents] = useAtom(selectedComponentAtom);
    const [uniqueId, setUniqueId] = useState(0);

    useEffect(() => {
        if (components && components.position) {
            const newItem = {
                id: components.id,
                position: components.position,
                url: components.url,
                uniqueId: uniqueId
            };
            setRender([...render, newItem]);
            setUniqueId(uniqueId + 1); // 更新 uniqueId
            console.log('渲染列表',render)
        } else {
            console.error("Component missing or invalid position data");
        }
    }, [components]);

    return (
        <group>
            {render.map((item) => (
                <Model
                    key={`${item.id}-${item.uniqueId}`}
                    url={item.url}
                    position={{ x: item.position.x, y: item.position.y, z: item.position.z }}
                />
            ))}
        </group>
    );
}

function Model({ url, position }) {
    const gltf = useLoader(GLTFLoader, url);
    // 克隆 gltf.scene 以确保每个实例都是独立的
    const sceneClone = useMemo(() => gltf.scene.clone(), [gltf.scene]);

    return (
        <primitive
            object={sceneClone}
            position={[position.x, position.y, position.z]}
        />
    );
}