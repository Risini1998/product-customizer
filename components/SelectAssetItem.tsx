import React, { FC } from "react";
import CN from "classnames";
import Image from "next/image";

export interface SelectAssetItemProps {
  [x: string]: any;
  innerProps?: any;
  innerRef: any;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

export const SelectAssetItem: FC<SelectAssetItemProps> = ({
  innerProps = {},
  innerRef,
  isDisabled = false,
  isFocused = false,
  isSelected = false,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  menuIsOpen,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  cx,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  clearValue,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  setValue,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  selectOption,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  isRtl,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  hasValue,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  isMulti,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  getValue,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  getClassNames,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  getStyles,
  // eslint-disable-next-line no-unused-vars, react/prop-types
  selectProps,
  ...restProps
}: SelectAssetItemProps) => {
  if (isDisabled) return null;

  const SelectAssetItemClasses = CN(
    `select__menu-item flex items-center w-full py-[8px] px-[16px] text-sm font-normal cursor-pointer bg-white hover:bg-N-50 active:bg-B-25 focus:bg-B-25 appearance-none outline-none gap-[8px]`,
    {
      "!bg-slate-500 !bg-opacity-20 !text-black": isSelected,
      "bg-slate-400 bg-opacity-20 text-black": isFocused,
    }
  );

  const { label, value } = restProps?.data || {};

  return (
    <button
      data-component-id="select-asset-item"
      className={SelectAssetItemClasses}
      key={value}
      ref={innerRef}
      {...innerProps}
      {...restProps}
    >
      <div className="p-1 flex justify-center items-center font-sans font-semibold w-full">
        <Image src={value?.assetUrl} alt={`image-base`} width={100} height={100} />
      </div>
    </button>
  );
};

export default SelectAssetItem;
