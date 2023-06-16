'use client'
import React from 'react'
import Select from 'react-select'
import useCountries from '~/app/hooks/useCountries'

export type CountrySelectValue = {
  flag: string,
  label: string,
  latlng: number[],
  region: string,
  value: string

}
interface CountrySelectProps {
  value?: CountrySelectValue,
  onChange: (value: CountrySelectValue) => void
}
function CountrySelect({
  value,
  onChange
}: CountrySelectProps) {
  const { getAll } = useCountries();
  return (
    <div>
        <Select 
            placeholder="Any where"
            value = {value}
            options={getAll()}
            onChange={(value) => onChange(value as CountrySelectValue)}
            formatOptionLabel={(option: any) => (
              <div className='flex items-center gap-3'>
               <p> {option.flag}</p>
                <div>
                    {option.label},
                    <span className='text-neutral-500 ml-1'>{option.region}</span>
                </div>
                </div>
            )}
            classNames={{
              control: () => 'mt-2 p-2 border-2',
              input: () => 'text-lg',
              option: () => 'text-lg'
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary: 'black',
                primary25: '#ffe4e6'
              }
            })}
        />
    </div>
  )
}

export default CountrySelect