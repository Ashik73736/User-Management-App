import { Input, Radio } from "antd";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setViewMode, setSearchQuery } from "../../store/users/reducer";

export default function SearchAndControls() {
  const dispatch = useDispatch();
  const { viewMode, searchQuery } = useSelector((s) => s.users);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Input.Search
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        style={{ width: 300 }}
      />
      <Radio.Group value={viewMode} onChange={(e) => dispatch(setViewMode(e.target.value))}>
        <Radio.Button value="table">
          <UnorderedListOutlined />
        </Radio.Button>
        <Radio.Button value="card">
          <AppstoreOutlined />
        </Radio.Button>
      </Radio.Group>
    </div>
  );
}
