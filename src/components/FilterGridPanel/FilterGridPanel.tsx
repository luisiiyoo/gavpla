import React, { useState } from 'react';
import { FilterGridPanelProps, ItemPanel } from './FilterGridPanel.types';
import { timestampToDateStr } from '../../utils';
import './FilterGridPanel.css';

const ItemGridPanel: React.FC<ItemPanel> = (props) => {
  const { image, player, date, id, winner } = props;
  return (
    <li className="ItemPanel">
      <div className="ItemPanel-Left">
        {image && <img className="ItemPanel-Image" src={image} alt={`${player}'s avatar`} />}
      </div>
      <div className="ItemPanel-Right">
        <div className="ItemPanel-Player">{`Player: ${player}`}</div>
        <div className="ItemPanel-Date">{`Date: ${timestampToDateStr(
          date,
        )}`}</div>
        <div className="ItemPanel-ID">{`ID: ${id}`}</div>
        <div className="ItemPanel-Winner">
          {!!winner ? `Winner: ${winner}` : 'No Winner'}
        </div>
      </div>
    </li>
  );
};

const FilterGridPanel: React.FC<FilterGridPanelProps> = (props) => {
  const [items, setItems] = useState(props.items);
  const [textFilter, setTextFilter] = useState('');
  const [viewStyle, setViewStyle] = useState('ListViewStyle');
  const [ascendingSortDate, setAscendingSortDate] = useState(false);
  const [ascendingSortPlayer, setAscendingSortPlayer] = useState(false);

  const handleOnChangeInputSearch = (e) => {
    setTextFilter(e.target.value);
  };
  const handleOnChangeView = (e) => {
    const newViewStyle =
      viewStyle === 'ListViewStyle' ? 'GridViewStyle' : 'ListViewStyle';
    setViewStyle(newViewStyle);
  };
  const handleOnSortByPlayer = (e) => {
    setAscendingSortPlayer(!ascendingSortPlayer);
    if (ascendingSortPlayer) {
      const sortedItems = items.sort((a, b) => (a.player > b.player ? 1 : -1));
      setItems(sortedItems);
    } else {
      const sortedItems = items.sort((a, b) => (a.player > b.player ? -1 : 1));
      setItems(sortedItems);
    }
  };
  const handleOnSortByDate = (e) => {
    setAscendingSortDate(!ascendingSortDate);
    if (ascendingSortDate) {
      const sortedItems = items.sort((a, b) => (a.date > b.date ? 1 : -1));
      setItems(sortedItems);
    } else {
      const sortedItems = items.sort((a, b) => (a.date > b.date ? -1 : 1));
      setItems(sortedItems);
    }
  };

  let itemsFiltered = items;
  if (textFilter.length > 0) {
    const textToFilter = textFilter.trim().toLowerCase();
    itemsFiltered = items.filter(({ player, winner }: ItemPanel) => {
      const players = `${player} ${!!winner ? winner : ''}`.toLowerCase();
      return players.includes(textToFilter);
    });
  }
  return (
    <div className="FilterGridPanel" data-testid="FilterGridPanel">
      <div className="ControlPanel">
        <input
          className="ControlPanel-Search"
          placeholder="Search player"
          value={textFilter}
          onChange={handleOnChangeInputSearch}
        />
        <button className="ControlPanel-Sort" onClick={handleOnSortByPlayer}>
          Sort by Player
        </button>
        <button className="ControlPanel-Sort" onClick={handleOnSortByDate}>
          Sort by Date
        </button>
        <button className="ControlPanel-Sort" onClick={handleOnChangeView}>
          Change View
        </button>
        <button
          className="ControlPanel-Sort"
          onClick={() => window.location.reload(true)}
        >
          Refresh
        </button>
      </div>
      <ul className={viewStyle}>
        {itemsFiltered.map((item: ItemPanel, id: number) => (
          <ItemGridPanel {...item} key={id} />
        ))}
      </ul>
    </div>
  );
};

export default FilterGridPanel;
