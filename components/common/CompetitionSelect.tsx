import React from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { getLeaguesAutoAPI } from "@/apis/soccer_apis";
import debounce from "lodash/debounce";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Avatar from "@mui/material/Avatar";
import { getMediaURL } from "@/utils";
import { Chip } from "@mui/material";
import { DEFAULT_COMPETITION_ICON } from "@/constants";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CompetitionSelectProps {
  value?: any;
  initLeagues?: any[];
  onChange?: any;
  multiple?: boolean;
}

function CompetitionSelect({
  onChange,
  value = initialVal,
  initLeagues,
  multiple = true,
  ...props
}: CompetitionSelectProps) {
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const initLeagues2 = initLeagues?.map((i) => i.slug);

  const fetch = React.useMemo(
    () =>
      debounce((input) => {
        setLoading(true);
        getLeaguesAutoAPI({ q: input || "", initLeagues: initLeagues2 })
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
      fullWidth
      id="id_select_competitions"
      value={value}
      onChange={(event, value1) => {
        onChange(value1);
      }}
      noOptionsText="Không tìm thấy giải đấu nào"
      limitTags={2}
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, v) => {
        return option.slug === v.slug;
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={({ ...props }: any, option, { selected }) => {
        return (
          <li {...props} key={option.slug}>
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
                src={getMediaURL(option.icon || DEFAULT_COMPETITION_ICON)}
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
            key={option.slug}
            label={option.name}
          />
        ));
      }}
      renderInput={(params: any) => (
        <TextField
          {...params}
          label="Giải đấu liên quan"
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
      onOpen={handleOpen}
    />
  );
}

export default React.memo(CompetitionSelect);

const initialVal = {
  icon: "",
  name: "",
  slug: "",
};
