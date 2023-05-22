<script setup lang="ts">
import { useBotStore } from '@/stores/currentBot';

const botStore = useBotStore()
</script>

<template>
    <div id="reupload-csv-ctr" class="space-y-6">
        <div id="reupload-csv" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <a href="">Uploaded file >></a>
                <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div class="collapse">
                    <input type="checkbox" />
                    <div class="collapse-title">
                        Reupload FAQ file
                    </div>
                    <div class="collapse-content space-y-4">
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">New FAQ .CSV file</span>
                            </label>
                            <input type="file" class="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                        <div id="form-actions" class="card-actions justify-start">
                            <button class="btn btn-primary">Upload</button>
                        </div>
                    </div>
                </div>



            </div>
            </div>
        </div>


    </div>
</template>