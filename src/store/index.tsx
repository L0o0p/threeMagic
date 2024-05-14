import { atom } from 'jotai';

// 创建一个 atom 来存储选中的组件
// 储存存在的对象
export const selectedComponentAtom = atom([
    { name: 'table', url: '/models/table.glb', position: { x: 0, y: 0, z: 0 }, num: 0, rotation: { x: 0, y: 0, z: 0 } },
    { name: 'chair', url: '/models/chair.glb', position: { x: 1, y: 1, z: 1 }, num: 0, rotation: { x: 0, y: 0, z: 0 } },
    { name: 'door', url: '/models/door.glb', position: { x: 1, y: 2, z: 1 }, num: 0, rotation: { x: 0, y: 0, z: 0 } },

]);

/*
[
    { name: 'table', url: '/models/table.glb', position: { x: 0, y: 0, z: 0 } },
    { name: 'chair', url: '/models/chair.glb', position: { x: 1, y: 1, z: 1 } },
]
 */