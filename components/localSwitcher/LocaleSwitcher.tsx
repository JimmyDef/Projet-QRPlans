'use client'
import Select, { StylesConfig, GroupBase, OptionProps } from 'react-select'
import { PropsWithChildren, useTransition, useId } from 'react'
import { Locale } from '@/services/locale'
import { setUserLocale } from '@/services/locale'
import './locale-switcher.scss'
import { useLocale } from 'next-intl'
import { colors } from '@/variables'

import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
type Option = {
  value: string
  label: string
  image: string | StaticImport
}
type Props = PropsWithChildren<{
  options: Option[]
  id: string
}>

export default function LocaleSwitcherSelect({ options, id }: Props) {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const uniqueId = useId()

  const onChange = (option: Option) => {
    if (option) {
      const locale = option.value as Locale
      startTransition(() => {
        setUserLocale(locale)
      })
    }
  }

  const optionStyles: StylesConfig<Option, false, GroupBase<Option>> = {
    option: (
      provided,
      state: OptionProps<Option, false, GroupBase<Option>>
    ) => {
      const activeStyle = {
        backgroundColor: colors.primary,
      }
      return {
        ...provided,
        cursor: 'pointer',
        fontSize: '14px',
        backgroundColor: state.isDisabled
          ? 'red'
          : state.isSelected
          ? 'white'
          : state.isFocused
          ? colors.secondary
          : undefined,
        color: state.isDisabled
          ? 'white'
          : state.isSelected
          ? colors.grey
          : state.isFocused
          ? 'white'
          : 'black',
        ':active': state.isSelected ? undefined : activeStyle,
      }
    },
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow:
        'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
    }),
    control: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      borderColor: state.isFocused ? colors.primary : provided.borderColor,
      boxShadow: state.isFocused ? '' : provided.boxShadow,
      '&:hover': {
        borderColor: state.isFocused ? colors.primary : 'grey',
      },
    }),
    menuList: (provided) => ({
      ...provided,
      cursor: 'pointer',
      padding: '9px 0',
      borderRadius: '5px',
    }),
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles, fontSize: '14px' }),
    singleValue: (styles) => ({ ...styles, color: colors.primary }),
  }

  return (
    <div className="locale-switcher">
      <Select
        className="locale-switcher__select"
        defaultValue={options.find((option: Option) => option.value === locale)}
        onChange={(option) => onChange(option as Option)}
        options={options}
        inputId={`${id}-input-${uniqueId}`}
        instanceId={`${id}-instance-${uniqueId}`}
        styles={optionStyles}
        formatOptionLabel={(option) => (
          <div className="locale-switcher__flag">
            <Image
              width={30}
              height={30}
              src={option.image}
              alt={`${option.label} flag`}
            />
          </div>
        )}
      />
    </div>
  )
}
