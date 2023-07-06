import { Command } from "commander"
import path from "path"
import { existsSync, promises as fs } from "fs"
import { logger } from "@/src/utils/logger"
import process from "process"
import { createJSONSnapshot } from "@/src/helpers/snapshot"
import chalk from "chalk"

/**
 * @internal
 */
export const snapshot = new Command()
    .name("snapshot")
    .description("Copy files and directories under \"./src/\" and transform them into JSON format.")
    .action(async () => {

        // Create the "snapshot" directory if it doesn't exist
        const snapshotDir = path.resolve("snapshot")
        if (!existsSync(snapshotDir)) {
            logger.error("An error occurred.")
            process.exit(0)
        }

        // Generate the timestamp for the snapshot file name
        const timestamp = new Date().toISOString().replace(/:/g, "-")
        const snapshotFilename = `snapshot_${timestamp}.json`
        const snapshotPath = path.join(snapshotDir, snapshotFilename)

        const jsonData = await createJSONSnapshot()
        const jsonOutput = JSON.stringify(jsonData.filter(n => n.name.length > 0), null, 2)
        await fs.writeFile(snapshotPath, jsonOutput, { encoding: "utf-8" })
        logger.success(`✔ Snapshot created: ${chalk.cyanBright(snapshotFilename)}`)
    })
