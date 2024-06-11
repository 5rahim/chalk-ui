import { promises as fs } from "fs"
import { existsSync } from "node:fs"
import path from "path"
import * as process from "process"
import { logger } from "../cli/utils/logger"
import { createBankSnapshot } from "./create-bank-snapshot"

/**
 * This script creates a snapshot of the bank.json file
 */
(async () => {
    const backupDir = path.resolve("cli/snapshot") // /cli/snapshot
    const timestamp = new Date().toISOString().replace(/:/g, "-")
    const backupFilename = `snapshot_${timestamp}.json`
    const backupFile = path.join(backupDir, backupFilename) // /cli/snapshot/snapshot_2022-01-01T00-00-00Z.json
    logger.success(`✔ Backup created`)

    // Create the "snapshot" directory if it doesn't exist
    const snapshotDir = path.resolve("cli")
    if (!existsSync(snapshotDir)) {
        logger.error("An error occurred.")
        process.exit(0)
    }

    // const snapshotPath = path.join(snapshotDir, "/bank/bank.json")
    const snapshotWebPath = path.join(process.cwd(), "/src/pages/api/bank.json")

    const jsonData = await createBankSnapshot()
    const jsonOutput = JSON.stringify(jsonData.filter(n => n.name.length > 0), null, 2)
    await fs.writeFile(snapshotWebPath, jsonOutput, { encoding: "utf-8" })
    await fs.writeFile(backupFile, jsonOutput, { encoding: "utf-8" })
    logger.success(`✔ Snapshot created`)

})()
