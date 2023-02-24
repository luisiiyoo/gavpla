export interface FilterGridPanelProps {
  items: ItemPanel[];
}

export interface ItemPanel {
  player: string;
  date: number;
  id: string;
  winner?: string;
  image?: string;
}
