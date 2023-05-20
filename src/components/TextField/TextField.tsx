import {
  Box,
  InputAdornment as MuiInputAdornment,
  styled,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps} from '@mui/material'
import Typography from '@mui/material/Typography'
import { FC, memo } from 'react'

import { Icon } from '../index'

export type ITextFieldProps = MuiTextFieldProps & {
  textFieldWidth?: number
  textFieldHeight?: number
  textFieldLeftIconName?: string
  textFieldMaxLength?: number
  textFieldBorderRadius?: number
}

const CustomTextField = styled(MuiTextField, {
  shouldForwardProp: (propName) =>
    propName !== 'textFieldWidth' &&
    propName !== 'textFieldHeight' &&
    propName !== 'textFieldBorderRadius'
})<ITextFieldProps>(
  ({ theme, textFieldWidth, textFieldHeight, textFieldBorderRadius }) => ({
    width: textFieldWidth === 0 ? '100%' : textFieldWidth,
    '& .MuiOutlinedInput-root': {
      padding: theme.spacing(0, 3),
      minHeight: textFieldHeight,
      position: 'relative',

      '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${theme.palette.green.light1}`
      },

      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${theme.palette.green.light1}`
        }
      },

      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${theme.palette.green.light1}`
        }
      },

      '&.MuiInputBase-multiline': {
        borderRadius: textFieldBorderRadius,
        padding: '10px 12px'
      }
    },

    '& .MuiOutlinedInput-input': {
      height: '100%',
      fontFamily: 'proxima_nova',
      fontSize: '14px',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '21px',
      color: theme.palette.green.dark,
      padding: '0px',

      '&::placeholder': {
        color: theme.palette.green.middle,
        opacity: 1
      }
    },

    '& .MuiSvgIcon-root': {
      color: theme.palette.green.light1
    },

    '& .MuiFormHelperText-root': {
      margin: '12px 0px 0px 0px',
      textAlign: 'end'
    }
  })
)

const TextFieldContainer = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'width'
})<{ width: number | undefined }>((props) => ({
  width: props.width ? props.width : '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '8px'
}))

export const TextField: FC<ITextFieldProps> = memo(
  ({
    textFieldWidth,
    textFieldHeight = 44,
    textFieldLeftIconName,
    textFieldBorderRadius,
    label,
    value,
    multiline,
    placeholder,
    disabled,
    sx,
    ...props
  }: ITextFieldProps) => {
    return (
      <TextFieldContainer width={textFieldWidth}>
        {label ? (
          <Box>
            <Typography className="text-sm leading-[21px] text-green-500 ml-[2px]">
              {label}
            </Typography>
          </Box>
        ) : (
          <></>
        )}
        <CustomTextField
          {...props}
          sx={sx}
          variant="outlined"
          textFieldWidth={textFieldWidth}
          textFieldHeight={multiline ? undefined : textFieldHeight}
          textFieldBorderRadius={textFieldBorderRadius}
          multiline={multiline}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          InputProps={{
            ...props.InputProps,
            startAdornment:
              props.InputProps?.startAdornment ||
              (textFieldLeftIconName && (
                <MuiInputAdornment position="start">
                  <Icon
                    iconName={textFieldLeftIconName}
                    iconSize={20}
                    tabIndex={-1}
                  />
                </MuiInputAdornment>
              ))
          }}
          InputLabelProps={{
            ...props.InputLabelProps,
            shrink: true
          }}
        />
      </TextFieldContainer>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
