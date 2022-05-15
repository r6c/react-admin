import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input, InputRef } from "antd";
import type { AutoCompleteProps } from "antd/es/auto-complete";
import React, { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";

import "./index.less";

export type HeaderSearchProps = {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options: AutoCompleteProps["options"];
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
};

const valueAtom = atom<string>("");
const searchModeAtom = atom<boolean>(false);

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    visible,
    defaultVisible,
    ...restProps
  } = props;

  const inputRef = useRef<InputRef | null>(null);

  const [value, setValue] = useAtom(valueAtom);

  const [searchMode, setSearchMode] = useAtom(searchModeAtom);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
    if (defaultVisible) {
      setSearchMode(defaultVisible);
    }
  }, [defaultValue, defaultVisible]);

  return (
    <div
      className="headerSearch"
      onClick={() => {
        setSearchMode(true);
        if (searchMode && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === "width" && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: "pointer",
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={searchMode ? "show" : "hidden"}
        value={value}
        options={restProps.options}
        onChange={setValue}
      >
        <Input
          size="small"
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
