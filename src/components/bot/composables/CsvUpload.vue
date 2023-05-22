<script setup lang="ts">
import { useBotStore } from '@/stores/currentBot';

const botStore = useBotStore()
</script>

<template>
    <div id="upload-csv-ctr" class="space-y-6">
        <div id="upload-csv" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Upload FAQ .CSV file</span>
                </label>
                <input type="file" class="file-input file-input-bordered w-full max-w-xs" />
            </div>
        </div>

        <div id="form-actions" class="card-actions justify-start">
            <button class="btn btn-primary">Upload</button>
        </div>
    </div>
</template>