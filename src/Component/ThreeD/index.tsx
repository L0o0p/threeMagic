import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { selectedComponentAtom } from "../../store";
import { useAtom } from "jotai";

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
            <Exist />
            <gridHelper
                args={[20, 20, 0xff0000]}
            />
        </Canvas>
    )
}

const Exist = () => {
    const [existObj] = useAtom(selectedComponentAtom)
    return (
        <group>
            {existObj.map((item) =>
                Array.from({ length: item.num }, (_, index) => {
                    // 为每个 Text 计算独特的位置和旋转
                    const positionOffset = 0.05; // 每个 Text 的位置偏移量
                    const rotationOffset = Math.PI / 6; // 每个 Text 的旋转偏移量（5度）

                    return (
                        <Text
                            key={`${item.name}-${index}`}  // 使用 index 来确保 key 的唯一性
                            scale={0.5}
                            position={[
                                item.position.x + index * positionOffset,  // 添加基于 index 的偏移
                                item.position.y,
                                item.position.z
                            ]}
                            rotation={[
                                item.rotation.x,
                                item.rotation.y + index * rotationOffset,  // 添加基于 index 的旋转偏移
                                item.rotation.z
                            ]}
                            children={item.name}
                        />
                    );
                })
            )}
        </group>
    )
}