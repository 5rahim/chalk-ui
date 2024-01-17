#!/usr/bin/env node
import { getPackageInfo } from "./utils/package"
import { Command } from "commander"
import { init } from "./commands/init"
import { add } from "./commands/add"
import { remove } from "./commands/remove"
import { clean } from "./commands/clean"
import { update } from "./commands/update"

async function main() {
    const packageInfo = getPackageInfo()

    const program = new Command()
        .name("@rahimstack/chalk-ui")
        .description("React, Tailwind components for SaaS applications.")
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

    program.parse()
}


main()
