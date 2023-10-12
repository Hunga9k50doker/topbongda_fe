import React from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { getTeamsAutoAPI } from "@/apis/soccer_apis";
import debounce from "lodash/debounce";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Avatar from "@mui/material/Avatar";
import { getMediaURL } from "@/utils";
import { Chip } from "@mui/material";
import { DEFAULT_TEAM_ICON } from "@/constants";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TeamSelectProps {
  onChange?: any;
  value?: any;
  initLeagues?: any;
  multiple?: boolean;
}

function TeamSelect({
  onChange,
  value = initialVal,
  initLeagues,
  multiple = true,
  ...props
}: TeamSelectProps) {
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const fetch = React.useMemo(
    () =>
      debounce((input) => {
        setLoading(true);
        getTeamsAutoAPI({ q: input || "" })
          .then((r) => {
            setOptions(r.data);
          })
          .finally(() => setLoading(false));
      }, 500),
    []
  );

  React.useEffect(() => {
    if (inputValue) {
      fetch(inputValue);
    }
  }, [inputValue]);

  const handleOpen = () => {
    if (options.length === 0) {
      setLoading(true);
      fetch("");
    }
  };
  return (
    <Autocomplete
      multiple={multiple}
      id="id_select_teams"
      value={value}
      noOptionsText="Không tìm thấy đội bóng nào"
      onChange={(event, value1) => {
        onChange(value1);
      }}
      limitTags={2}
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, v) => {
        return option.code === v.code;
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={({ ...props }: any, option, { selected }) => {
        return (
          <li {...props} key={option.code}>
            {multiple && (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
            )}
            <div className="flex items-center space-x-2">
              <Avatar
                src={getMediaURL(option.icon || DEFAULT_TEAM_ICON)}
                alt=""
                sx={{ width: 16, height: 16 }}
                className="bg-gray-100"
              />
              <span>{option.name}</span>
            </div>
          </li>
        );
      }}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.code}
            label={option.name}
          />
        ));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Đội bóng liên quan"
          placeholder="Gõ để tìm..."
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
      fullWidth
      onOpen={handleOpen}
    />
  );
}

export default React.memo(TeamSelect);

const initialVal = {
  code: "",
  country: "",
  icon: "",
  logo: "",
  name: "",
  numFans: 0,
  venue: "",
};
