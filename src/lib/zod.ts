import { any, array, object, string, boolean } from 'zod';

export const signInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
});

export const TCultureFormSchema = object({
  description: string()
    .max(500, { message: 'Description cannot exceed 500 characters!' })
    .optional(),
  name_fr: string().min(1, { message: 'frenchNameIsRequired' }),
  name_ar: string().min(1, { message: 'arabicNameIsRequired' }),
  name_en: string().min(1, { message: 'englishNameIsRequired' })
});

export type TCultureFormSchemaType = Zod.infer<typeof TCultureFormSchema>;

export const TSubCultureFormSchema = object({
  name_en: string().min(1, { message: 'English name is required!' }),
  name_fr: string().min(1, { message: 'French name is required!' }),
  name_ar: string().min(1, { message: 'Arabic name is required!' }),
  description: string()
    .max(500, { message: 'Description cannot exceed 500 characters!' })
    .optional(),
  kc: array(any()).optional(),
  rfu: string().optional(),
  editable: boolean().optional()
});

export type TSubCultureFormSchemaType = Zod.infer<typeof TSubCultureFormSchema>;

export const stepSchemas = [
  object({
    name_en: string().min(2, 'frenchNameIsRequired'),
    name_fr: string().min(2, 'arabicNameIsRequired'),
    name_ar: string().min(2, 'englishNameIsRequired'),
    description: string().optional()
  }),
  object({
    rfu: string().optional(),
    editable: boolean().optional(),
    kc: array(any()).optional()
  })
];

export const voucherSchema = object({
  code: string().min(1, 'codeIsRequired'),
  inform: boolean().optional(),
  user_id: string().optional(),
  details: object({
    end_date: string().min(1, 'endDateIsRequired'),
    message: string().min(1, 'messageIsRequired'),
    percent: string().min(1, 'percentIsRequired'),
    // type is either PAYMENT or DISCOUNT
    type: string().refine((value) => ['PAYMENT', 'DISCOUNT'].includes(value), {
      message: 'type must be either PAYMENT or DISCOUNT'
    }),
    included_groups: array(string()).optional(),
    value: string().optional()
  })
});

export const EquipmentSchema = object({
  name: string().min(1, 'nameIsRequired'),
  description: string().min(1, 'descriptionIsRequired'),
  reference: string().min(1, 'referenceIsRequired')
});

export type TEquipmentSchemaType = Zod.infer<typeof EquipmentSchema>;

export const equipmentStepsSchema = [
  object({
    name: string().min(1, 'nameIsRequired'),
    description: string().min(1, 'descriptionIsRequired'),
    reference: string().min(1, 'referenceIsRequired')
  }),
  object({
    prmdatatypes: array(string()).min(1, 'prmdatatypesIsRequired')
  }),
  object({
    optionalSelectedDataTypeId: array(string()).min(1, 'Data type is required'),
    rangeMax: string().optional(),
    rangeMin: string().optional(),
    resolution: string().optional(),
    Accuracy: string().optional(),
    Unit: string().optional()
  })
];
