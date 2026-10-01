// components/inputs/CountryAutoCodeInput.tsx

import React, { useEffect } from 'react'
import { useFormValue, set, PatchEvent } from 'sanity'
import type { StringInputProps } from 'sanity'
import { countryCodeMap } from './countryCodeMap'

export default function CountryAutoCodeInput(props: StringInputProps) {
  const { onChange, value, path } = props

  const parentPath = path.slice(0, -1) // path to object level
  const countryName = useFormValue([...parentPath, 'countryName']) as string

  useEffect(() => {
    if (countryName && countryCodeMap[countryName]) {
      const code = countryCodeMap[countryName]
      if (code !== value) {
        onChange(PatchEvent.from(set(code))) // ✅ CORRECT usage
      }
    }
  }, [countryName, value, onChange])

  return (
    <div style={{ padding: '0.5rem', fontStyle: 'italic', color: '#666' }}>
      Auto-filled: {value || '—'}
    </div>
  )
}
