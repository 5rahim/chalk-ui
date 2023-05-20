type LocaleDefinition = {
   [key: string]: {
      [lng: string]: string
   }
}

export default {
   delete: {
      fr: "Supprimer",
      en: "Delete",
   },
   irreversible_action: {
      fr: "Cette action est irréversible.",
      en: "This action is irreversible.",
   },
   name: {
      fr: "Zone de danger",
      en: "Danger Zone",
   },
   confirm_delete: {
      fr: "Êtes-vous sûr de vouloir effectuer cette action ?",
      en: "Are you sure you want to confirm this action ?",
   },
   cancel: {
      fr: "Annuler",
      en: "Cancel",
   },
} satisfies LocaleDefinition

