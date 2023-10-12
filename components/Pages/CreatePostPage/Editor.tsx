import { useTheme } from "@mui/material/styles";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/material";
interface EditorProps {
  value?: string;
  placeholder?: string;
  onChange?: () => void;
}

const TOOLBAR_OPTIONS = [
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [
    {
      color: ["#ffffff", "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00"],
    },
    {
      background: [
        "#ffffff",
        "#000000",
        "#e60000",
        "#ff9900",
        "#ffff00",
        "#008a00",
      ],
    },
  ],
  // [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote"],
  ["clean"],
];

const Editor = ({
  value,
  placeholder = "Nhập nội dung...",
  onChange,
}: EditorProps) => {
  const theme: any = useTheme();

  return (
    <Box
      className="container-editor"
      sx={{
        "& .ql-toolbar": {
          backgroundColor: "#f0f2f5",
        },
        "& .ql-container": {
          minHeight: "300px",
          color: theme.palette.text.primary,
        },
        "& ::placeholder": {
          color: `${theme.palette.text.primary} !important`,
        },
        "& .ql-active": {
          color: `${theme.palette.primary.main} !important}`,
        },
        "& .ql-editor.ql-blank::before": {
          color: `${theme.palette.text.primary} !important`,
        },
      }}
    >
      <ReactQuill
        theme="snow"
        value={value || ""}
        modules={{
          toolbar: TOOLBAR_OPTIONS,
        }}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default Editor;
