import React from 'react'
import { BasePropertyProps } from 'adminjs'
import { Label, Box, DropZone, DropZoneProps, DropZoneItem } from '@adminjs/design-system'

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange, record } = props

  const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
    onChange(property.name, files[0])
  }

  const uploadedPhoto = record.params.coverImage
  const photoToUpload = record.params[property.name]

  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange}/>
      {uploadedPhoto && !photoToUpload && (
        <DropZoneItem src={uploadedPhoto} />
      )}
    </Box>
  )
}

export default Edit