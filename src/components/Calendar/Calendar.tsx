import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Box as MuiBox, styled, useTheme } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { FC, memo,RefAttributes } from 'react'
import { TextField } from 'src/components'

export type ICalendarProps<TInputDate, TDate> = DatePickerProps<
  TInputDate,
  TDate
> &
  RefAttributes<HTMLDivElement> & {
    calendarPlaceholder?: string
    onBlur?: () => void
  }

const CalendarContainer = styled(MuiBox)(() => ({
  width: '100%'
}))

export const Calendar: FC<ICalendarProps<Date, Date>> = memo(
  ({
    value,
    label = 'Date',
    calendarPlaceholder = 'Select Starting Date',
    onBlur,
    ...props
  }) => {
    const theme = useTheme()

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarContainer>
          <DatePicker
            {...props}
            value={value}
            showDaysOutsideCurrentMonth={true}
            components={{
              OpenPickerIcon: () => (
                <CalendarMonthOutlinedIcon fontSize="small" />
              ),
              LeftArrowIcon: () => (
                <ArrowBackIcon
                  sx={{ fontSize: 16, color: theme.palette.orange.dark }}
                />
              ),
              RightArrowIcon: () => (
                <ArrowForwardIcon
                  sx={{ fontSize: 16, color: theme.palette.orange.dark }}
                />
              )
            }}
            PaperProps={{
              sx: {
                '& .MuiCalendarPicker-root': {
                  '& .MuiButtonBase-root': {
                    color: theme.palette.green.dark,
                    backgroundColor: 'transparent'
                  },
                  '& .MuiPickersCalendarHeader-root': {
                    '& .MuiPickersCalendarHeader-label': {
                      color: theme.palette.orange.dark,
                      fontStyle: 'normal',
                      fontWeight: '700',
                      fontSize: '14px',
                      lineHeight: '24px'
                    },

                    '& .MuiPickersCalendarHeader-switchViewButton': {
                      color: theme.palette.orange.dark
                    }
                  },
                  '& .MuiPickersFadeTransitionGroup-root': {
                    '& .PrivatePickersSlideTransition-root': {},

                    '& .MuiDayPicker-weekDayLabel': {
                      color: theme.palette.green.dark,
                      fontWeight: '700',
                      fontSize: '14px',
                      lineHeight: '24px'
                    },

                    '& .MuiButtonBase-root.MuiPickersDay-root': {
                      color: theme.palette.green.dark,
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '24px',

                      '&.MuiPickersDay-today': {
                        backgroundColor: theme.palette.divider,
                        border: 'none'
                      },
                      '&.Mui-selected': {
                        color: '#FFFFFF',
                        backgroundColor: `${theme.palette.orange.dark} !important`
                      }
                    },

                    '& .MuiButtonBase-root.MuiPickersDay-dayOutsideMonth': {
                      color: theme.palette.green.light1
                    },

                    '& .MuiYearPicker-root': {
                      '& .PrivatePickersYear-root': {
                        '& .PrivatePickersYear-yearButton': {
                          fontStyle: 'normal',
                          fontWeight: '500',
                          fontSize: '14px',
                          lineHeight: '24px',
                          '&.Mui-selected': {
                            backgroundColor: `${theme.palette.orange.dark} !important`
                          }
                        }
                      }
                    }
                  }
                }
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: calendarPlaceholder
                }}
                label={label}
                textFieldHeight={44}
                onBlur={onBlur}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    padding: 0,
                    flexDirection: 'row-reverse',
                    '& .MuiButtonBase-root': {
                      marginLeft: theme.spacing(-1)
                    },
                    '& .MuiOutlinedInput-input': {
                      marginLeft: theme.spacing(3)
                    },
                    '&.Mui-error.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'black'
                    }
                  }
                }}
              />
            )}
          />
        </CalendarContainer>
      </LocalizationProvider>
    )
  }
)

Calendar.displayName = 'Calendar'

export default Calendar
