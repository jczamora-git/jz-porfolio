/**
 * Google Apps Script: Jeizi Portfolio Drive Manifest Enumerator
 *
 * PURPOSE:
 * Automates the one-time enumeration of all 79 portfolio works across the 6
 * canonical Google Drive category folders. Eliminates manual file-by-file ID collection.
 *
 * READ-ONLY SAFETY GUARANTEE:
 * This script only performs read-only Drive operations (DriveApp.getFolderById,
 * folder.getFiles, file.getName, file.getId, file.getMimeType). It does NOT
 * modify, move, rename, or delete any Drive files or folders.
 *
 * HOW TO RUN:
 * 1. Open https://script.google.com while signed in to the Google account that owns/has access to the Drive folders.
 * 2. Click "New project".
 * 3. Replace all existing text in Code.gs by pasting this entire file.
 * 4. In the function dropdown at the top toolbar, select "exportJeiziGalleryManifest".
 * 5. Click "Run" (▶).
 * 6. Review permissions: Click "Review permissions" -> select account -> "Advanced" -> "Go to Untitled project (unsafe)" -> "Allow".
 * 7. In the "Execution log" at the bottom, find the JSON between:
 *    --- BEGIN JEIZI GALLERY MANIFEST JSON ---
 *    ... [JSON data] ...
 *    --- END JEIZI GALLERY MANIFEST JSON ---
 * 8. Copy the JSON block and save it in the repository root as: drive-files.json
 * 9. Run in repository terminal:
 *    node scripts/import-drive-manifest.mjs drive-files.json
 */

function exportJeiziGalleryManifest() {
  const CATEGORIES = [
    {
      category: "featured",
      folderId: "1VjkTQ1zrOngNlHngLaTpkVXBWR7ooj7n",
      expectedCount: 6,
    },
    {
      category: "event",
      folderId: "1RDSIMmbxpi_EbJV6kH9GDPHWtMdBFT-5",
      expectedCount: 10,
    },
    {
      category: "logo",
      folderId: "1pICY8qRqJvIY1MrSVpQLmSBGwEoJstkc",
      expectedCount: 13,
    },
    {
      category: "print",
      folderId: "1yr7jqSf7MvoN2of8QwFngwdAkwySBVzW",
      expectedCount: 9,
    },
    {
      category: "social",
      folderId: "1mkO97F5i1JNoTQcLD5R4UFIEN-a-pZPm",
      expectedCount: 20,
    },
    {
      category: "shirts",
      folderId: "1iPkgip2CDJkiq6tfp0D_iTu3GptvBg1r",
      expectedCount: 21,
    },
  ];

  const EXPECTED_TOTAL = 79;
  const KNOWN_SAMPLE = {
    category: "social",
    filename: "story-2.png",
    expectedFileId: "16z00-J_D9E0-pkscMOmjBKhHfK_miqdX",
  };

  const results = [];
  const errors = [];
  const categoryCounts = {};

  Logger.log("=== Starting Jeizi Portfolio Google Drive Enumeration ===");

  for (const cat of CATEGORIES) {
    Logger.log(`Scanning category '${cat.category}' (folder ID: ${cat.folderId})...`);
    let folder;
    try {
      folder = DriveApp.getFolderById(cat.folderId);
    } catch (err) {
      const msg = `CRITICAL: Unable to open folder for '${cat.category}' (${cat.folderId}): ${err.message}`;
      Logger.log(msg);
      errors.push(msg);
      continue;
    }

    const filesIter = folder.getFiles();
    let count = 0;

    while (filesIter.hasNext()) {
      const file = filesIter.next();
      // Read-only metadata extraction
      const filename = file.getName();
      const fileId = file.getId();
      const mimeType = file.getMimeType();

      results.push({
        category: cat.category,
        filename: filename,
        fileId: fileId,
        mimeType: mimeType,
      });

      count++;
    }

    categoryCounts[cat.category] = count;
    Logger.log(`Category '${cat.category}': found ${count} files (expected: ${cat.expectedCount}).`);

    if (count !== cat.expectedCount) {
      const warning = `CATEGORY COUNT MISMATCH for '${cat.category}': expected ${cat.expectedCount}, found ${count}.`;
      Logger.log("WARNING: " + warning);
      errors.push(warning);
    }
  }

  // Deterministic sorting by category, then by filename
  results.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.filename.localeCompare(b.filename);
  });

  Logger.log(`\nTotal files enumerated: ${results.length} / ${EXPECTED_TOTAL}`);
  if (results.length !== EXPECTED_TOTAL) {
    const totalWarning = `TOTAL COUNT MISMATCH: expected ${EXPECTED_TOTAL}, collected ${results.length}.`;
    Logger.log("WARNING: " + totalWarning);
    errors.push(totalWarning);
  }

  // Validate known sample: social/story-2.png
  const story2Sample = results.find(
    (item) => item.category === KNOWN_SAMPLE.category && item.filename === KNOWN_SAMPLE.filename
  );
  if (!story2Sample) {
    const sampleError = `SAMPLE VALIDATION FAILED: '${KNOWN_SAMPLE.category}/${KNOWN_SAMPLE.filename}' was not found in Drive.`;
    Logger.log("ERROR: " + sampleError);
    errors.push(sampleError);
  } else if (story2Sample.fileId !== KNOWN_SAMPLE.expectedFileId) {
    const sampleMismatch = `SAMPLE FILE ID MISMATCH for '${KNOWN_SAMPLE.category}/${KNOWN_SAMPLE.filename}': expected '${KNOWN_SAMPLE.expectedFileId}', got '${story2Sample.fileId}'.`;
    Logger.log("ERROR: " + sampleMismatch);
    errors.push(sampleMismatch);
  } else {
    Logger.log(`SAMPLE CHECK PASSED: ${KNOWN_SAMPLE.category}/${KNOWN_SAMPLE.filename} -> ${story2Sample.fileId}`);
  }

  if (errors.length > 0) {
    Logger.log("\n=======================================================");
    Logger.log("ATTENTION: Enumeration encountered warnings / errors:");
    for (const err of errors) {
      Logger.log(" - " + err);
    }
    Logger.log("=======================================================\n");
  } else {
    Logger.log("\nALL CHECKS PASSED: 79 works successfully verified across 6 categories.\n");
  }

  const jsonString = JSON.stringify(results, null, 2);

  Logger.log("--- BEGIN JEIZI GALLERY MANIFEST JSON ---");
  Logger.log(jsonString);
  Logger.log("--- END JEIZI GALLERY MANIFEST JSON ---");

  return results;
}
