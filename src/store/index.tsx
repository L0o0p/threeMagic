import { atom } from 'jotai';

// 数据表类型定义
// 定义 store 的键类型
export type StoreKey = 'table' | 'chair' | 'door';

// 定义 store 对象的类型
export interface StoreProps {
    table: { id: string; url: string, position?: { x: number; y: number; z: number }; };
    chair: { id: string; url: string, position?: { x: number; y: number; z: number }; };
    door: { id: string; url: string, position?: { x: number; y: number; z: number }; };
}
// 数据表
export const store: StoreProps =
{
    table: { id: 'table', url: '/models/table.glb', position: { x: 0, y: 0, z: 0 } },
    chair: { id: 'chair', url: '/models/chair.glb', position: { x: 0, y: 0, z: 0 } },
    door: { id: 'door', url: '/models/door.glb', position: { x: 0, y: 0, z: 0 } }
}

// 创建一个 atom 来存储选中的组件
// 创建新对象需要携带的信息
export const selectedComponentAtom = atom<{ id: string; url: string; position?: { x: number; y: number; z: number } } | null>(null);

export const positionAtom = atom({ x: 0, y: 0, z: 0 })
