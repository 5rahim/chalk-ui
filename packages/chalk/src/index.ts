#!/usr/bin/env node
import { getPackageInfo } from "@/src/utils/package"
import { Command } from "commander"
import { init } from "@/src/commands/init"
import { add } from "@/src/commands/add"
import { remove } from "@/src/commands/remove"
import { clean } from "@/src/commands/clean"
import { update } from "@/src/commands/update"
import { snapshot } from "@/src/commands/snapshot"

async function main() {
    const packageInfo = await getPackageInfo()

    const program = new Command()
        .name("@rahimstack/chalk-ui")
        .description("React and Tailwind components")
        .version(
            packageInfo.version || "1.0.0",
            "-v, --version",
            "display the version number",
        )

    program
        .addCommand(init)
        .addCommand(add)
        .addCommand(update)
        .addCommand(remove)
        .addCommand(clean)
        .addCommand(snapshot)

    program.parse()
}


main()
