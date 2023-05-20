import { FieldValues } from 'react-hook-form'
import { z as zod, ZodType } from 'zod'
import { schemaPresets } from './schema-presets'
import { TypesafeFormProps } from './typesafe-form'

export type InferType<S extends ZodType<any, any, any>> = zod.infer<S>

type DataSchemaCallback<S extends zod.ZodRawShape> = ({ z, presets }: { z: typeof zod, presets: typeof schemaPresets }) => zod.ZodObject<S>
export const createTypesafeFormSchema = <S extends zod.ZodRawShape>(callback: DataSchemaCallback<S>): zod.ZodObject<S> => {
   return callback({ z: zod, presets: schemaPresets })
}

export type CreateTypesafeFormProps<Schema extends FieldValues> = {
   schema: TypesafeFormProps<Schema>['schema']
   onSubmit: TypesafeFormProps<Schema>['onSubmit']
   defaultValues?: TypesafeFormProps<Schema>['defaultValues']
}

export function createTypesafeForm<Schema extends FieldValues>({
   onSubmit, schema, defaultValues, ...rest
}: CreateTypesafeFormProps<Schema>): TypesafeFormProps<Schema> {
   return {
      onSubmit,
      schema,
      defaultValues,
      ...rest,
   }
}
