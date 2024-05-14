import { atom } from 'jotai';

// 数据表
// 定义 store 的键类型
export type StoreKey = 'table' | 'chair' | 'door';

// 定义 store 对象的类型
interface Store {
    table: { position: object, id: string; url: string; };
    chair: { position: object, id: string; url: string; };
    door: { position: object, id: string; url: string; };
}
export const store: Store =
{
    table: { id: 'table', url: '/models/table.glb', position: { x: 0, y: 0, z: 0 } },
    chair: { id: 'chair', url: '/models/chair.glb', position: { x: 0, y: 0, z: 0 } },
    door: { id: 'door', url: '/models/door.glb', position: { x: 0, y: 0, z: 0 } }
}

// 创建一个 atom 来存储选中的组件
// 创建新对象需要携带的信息
export const selectedComponentAtom = atom(null);

export const positionAtom = atom({ x: 0, y: 0, z: 0 })
