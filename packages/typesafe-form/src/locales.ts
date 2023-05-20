export type LocaleDefinition = {
   [component: string]: {
      [key: string]: {
         [lng: string]: string
      }
   }
}
export const UILocales = {
   dropzone: {
      download: {
         fr: "Télécharger un fichier ou glisser-déposer",
         en: "Download a file",
      },
   },
   imageGridInput: {
      default_label: {
         fr: "Images",
         en: "Images",
      },
      add: {
         fr: "Ajouter",
         en: "Add",
      },
      click_to_add: {
         fr: "Cliquez pour ajouter",
         en: "Click to add",
      },
      image_already_exists: {
         fr: "L'image existe déjà",
         en: "Image already exists",
      },
      main_image: {
         fr: "Image principale",
         en: "Main image",
      },
      edit: {
         fr: "Modifier",
         en: "Edit",
      },
   },
   dangerZone: {
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
   },
   submit: {
      create: {
         fr: "Créer",
         en: "Create",
      },
      add: {
         fr: "Ajouter",
         en: "Add",
      },
      update: {
         fr: "Modifier",
         en: "Update",
      },
      search: {
         fr: "Chercher",
         en: "Search",
      },
      save: {
         fr: "Enregister",
         en: "Save",
      },
      submit: {
         fr: "Soumettre",
         en: "Submit",
      },
   },
   filter: {
      all: {
         fr: "Tout",
         en: "All",
      },
      yes: {
         fr: "Oui",
         en: "Yes",
      },
      no: {
         fr: "Non",
         en: "No",
      },
   },
   addressInput: {
      no_address_found: {
         fr: "Aucune adresse trouvée",
         en: "No address found",
      },
      enter_address: {
         fr: "Entrez l'addresse",
         en: "Enter the address",
      },
   },
} satisfies LocaleDefinition
