import { useState, useEffect } from "react";
import { CarouselItem } from "../ui/carousel";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const checkedIds = [...checked];
  const handleToggle = (id) => () => {
    const foundId = checked.indexOf(id);
    if (foundId === -1) {
      checkedIds.push(id);
    } else {
      checkedIds.splice(foundId, 1);
    }
    setChecked(checkedIds);
    handleFilters(checkedIds);
  };

  return categories?.map((category) => (
    <CarouselItem
      className="mr-2 sm:basis-1/5  lg:basis-1/4 basis-1/2 sm:w-full w-0"
      key={category?._id}
    >
      <div className="flex gap-2">
        <input
          onChange={handleToggle(category?._id)}
          value={checked.indexOf(category?._id === -1)}
          type="checkbox"
          className="w-4"
        />
        <label className="">{category?.name}</label>
      </div>
    </CarouselItem>
  ));
};

export default CheckBox;
