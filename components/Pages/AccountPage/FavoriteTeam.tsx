import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Form } from "antd";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash/debounce";
import { getTeamsAutoAPI } from "@/apis/soccer_apis";
import Avatar from "@mui/material/Avatar";
import { getMediaURL, numberWithCommas } from "@/utils";
import { useSelector } from "react-redux";
import { postUsersAPI } from "@/apis/user_apis";
import { toast } from "react-toastify";
import { DEFAULT_TEAM_ICON } from "@/constants";
import { RootState } from "@/store";
import { USER_API_UPDATE_PROFILE } from "@/configs/endpoints/user_endpoints";

function FavoriteTeam() {
  const [form] = Form.useForm();
  const store = useSelector((state: RootState) => state.userStore.data);
  const [loading, setLoading] = React.useState(false);

  const handleFinish = (values: any) => {
    setLoading(true);
    const p = {
      ...values,
      action: "fav-team",
    };
    postUsersAPI(USER_API_UPDATE_PROFILE, p)
      .then((r) => {
        const d = r.data;
        if (d.ok) {
          toast.success("Cập nhật thành công!");
          window.location.href = `?t=${Date.now()}`;
        } else {
          toast.error(d.msg);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  };

  React.useEffect(() => {
    form.resetFields();
  }, [store.username]);

  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="text-primary font-bold heading-font" id="id_fav_team">
          Chọn đội bóng yêu thích
        </h2>

        {store.favoriteTeam ? (
          <>
            <div className="mt-4 flex items-center">
              <Image
                src={getMediaURL(store.favoriteTeam?.icon) || DEFAULT_TEAM_ICON}
                alt=""
                width={40}
                height={40}
              />
              <div className="ml-2 flex flex-col">
                <div className="font-bold text-sm">
                  {store.favoriteTeam?.name}
                </div>
                {store.favoriteTeam?.numFans > 0 && (
                  <div className="text-xs">
                    {numberWithCommas(store.favoriteTeam?.numFans)} fans
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {store.favoriteTeamOther && (
              <div>
                <span>Đã chọn: </span>
                <span className="font-bold text-xl">
                  {store.favoriteTeamOther}
                </span>
              </div>
            )}
          </>
        )}

        <Form
          name="form-select-favorite-team"
          form={form}
          initialValues={{
            team: null,
            teamOther: store.favoriteTeamOther,
            remove: false,
          }}
          onFinish={handleFinish}
        >
          <Form.Item name="team" style={{ margin: "16px 0" }}>
            <AutocompleteOverride value={""} onChange={(e) => e} />
          </Form.Item>
          <Form.Item name="teamOther" style={{ margin: "16px 0" }}>
            <TextField label="Nhập đội không có trong danh sách" fullWidth />
          </Form.Item>

          <div className="mt-2">
            <Form.Item
              name="remove"
              valuePropName="checked"
              style={{ margin: "16px 0" }}
            >
              <FormControlLabel
                className="text-gray-400"
                control={<Checkbox />}
                label="Xóa chọn đội bóng yêu thích"
              />
            </Form.Item>
          </div>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="bg-primary hover:bg-success"
          >
            Lưu Thông Tin
          </Button>
          <div className="mt-2 text-xs text-gray-400">
            (*) Nếu không chọn đội bóng từ danh sách bạn có thể tự nhập. Web sẽ
            ưu tiên hiển thị lựa chọn có trong danh sách.
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default React.memo(FavoriteTeam);

interface AutocompleteOverrideProps {
  value: any;
  onChange: (value: any) => void;
}

function AutocompleteOverride({
  value,
  onChange,
  ...props
}: AutocompleteOverrideProps) {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (inputValue) {
      fetch(inputValue);
    }
  }, [inputValue]);

  const fetch = React.useMemo(
    () =>
      debounce((input) => {
        setLoading(true);
        getTeamsAutoAPI({ q: input || "" })
          .then((r) => {
            setOptions(r.data);
          })
          .finally(() => setLoading(false));
      }, 400),
    []
  );

  const handleOpen = () => {
    if (options.length === 0) {
      setLoading(true);
      fetch("");
    }
  };

  return (
    <Autocomplete
      fullWidth
      onOpen={handleOpen}
      filterOptions={(x) => x}
      onChange={(event, value1) => {
        onChange(value1);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option: any, v: any) => {
        return option.code === v.code;
      }}
      getOptionLabel={(option) => {
        return option?.name || "";
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Chọn đội bóng"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress
                    aria-busy={loading}
                    aria-describedby="loading-progress"
                    color="inherit"
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <div className="flex items-center space-x-2">
              <Avatar
                src={getMediaURL(option.icon)}
                alt=""
                sx={{ width: 20, height: 20 }}
              />
              <span>{option.name}</span>
            </div>
          </li>
        );
      }}
    />
  );
}
