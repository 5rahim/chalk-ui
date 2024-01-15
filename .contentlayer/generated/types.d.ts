// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer/core'
import * as Local from 'contentlayer/source-files'

export { isType } from 'contentlayer/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type Doc = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Doc'
  title: string
  description: string
  componentName?: string | undefined
  published: boolean
  links?: LinksProperties | undefined
  featured: boolean
  component: boolean
  toc: boolean
  /** MDX file body */
  body: MDX
  slug: string
  slugAsParams: string
}  

/** Nested types */
export type LinksProperties = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'LinksProperties'
  doc?: string | undefined
  api?: string | undefined

}  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = Doc
export type DocumentTypeNames = 'Doc'

export type NestedTypes = LinksProperties
export type NestedTypeNames = 'LinksProperties'

export type DataExports = {
  allDocuments: DocumentTypes[]
  allDocs: Doc[]
}


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
  dataExports: DataExports
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Doc: Doc
}

export type NestedTypeMap = {
  LinksProperties: LinksProperties
}

 