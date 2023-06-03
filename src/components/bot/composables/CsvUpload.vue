<script setup lang="ts">
import { useBotStore } from '@/stores/currentBot';
import { authHeaders } from '@/stores/keycloak';
import { ref } from 'vue';

const botStore = useBotStore()
const csvFileSelected = ref(false)
const uploading = ref(false)
const error = ref<String>()

function upload() {
    console.info('Uploading csv...')
    if (!csvFileSelected.value) {
        console.warn('Form invalid')
        return
    }
    const form = document.getElementById("form-upload-csv") as HTMLFormElement
    const formData = new FormData(form)

    uploading.value = true
    const response = fetch('/api/bots/' + botStore.bot!.id + '/csv', {
        method: 'POST',
        headers: authHeaders(),
        body: formData
    })
        .then((response) => {
            // console.debug(response)
            if (response.ok) {
                error.value = undefined
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            botStore.bot!.csvSaved = true
            // reuploading.value = false
            csvFileSelected.value = false
            uploading.value = false
            console.info('Csv uploaded')
        })
        .catch((err: Error) => {
            uploading.value = false
            console.error(err.message)
            error.value = err.message
        })
}

function csvFileChanged() {
    csvFileSelected.value = true
}
</script>

<template>
    <div id="upload-csv-ctr" class="space-y-6">
        <div id="upload-csv-form-ctr" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- upload -->
            <div v-if="!botStore.bot!.csvSaved" class="space-y-4">
                <form id="form-upload-csv" onsubmit="return false;">
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Upload FAQ .CSV file</span>
                        </label>
                        <input id="file_csv" name="csv" accept="text/csv" type="file" @change="csvFileChanged" required
                            class="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <!-- </div> -->
                </form>

                <div id="form-actions" class="card-actions justify-start">
                    <button class="btn btn-primary" :disabled="!csvFileSelected" @click="upload">Upload</button>
                    <button v-if="uploading" class="btn btn-ghost loading">Uploading...</button>
                </div>
            </div>

            <!-- reupload -->
            <div v-else class="space-y-4">
                <a v-if="!uploading" class="link link-secondary" target="_blank" v-bind:href="'/api/csv/' + botStore.bot!.id">Uploaded file >></a>
                <!-- <input type="checkbox" class="checkbox" disabled checked /> -->
                <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <div class="collapse">
                        <input type="checkbox" />
                        <div class="collapse-title">
                            Reupload FAQ .CSV file
                        </div>
                        <div class="collapse-content space-y-4">
                            <form id="form-upload-csv" class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">New FAQ .CSV file</span>
                                </label>
                                <input id="file_csv" name="csv" accept="text/csv" type="file" @change="csvFileChanged"
                                    required class="file-input file-input-bordered w-full max-w-xs" />
                            </form>
                            <!-- <div id="form-actions" class="card-actions justify-start">
                                <button class="btn btn-primary" :disabled="!csvFileSelected" @click="upload">Upload</button>
                            </div> -->
                            <div id="form-actions" class="card-actions justify-start">
                                <button class="btn btn-primary" :disabled="!csvFileSelected" @click="upload">Reupload</button>
                                <button v-if="uploading" class="btn btn-ghost loading">Uploading...</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- errors -->
            <div v-if="error" class="alert alert-error justify-start lg:w-1/2 ">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> -->
                <span>Csv upload failed! {{ error }}</span>
            </div>
        </div>
    </div>


    <div v-if="false" id="upload-csv-ctr" class="space-y-6">
        <!-- <div id="upload-csv" className="grid grid-cols-1 md:grid-cols-2 gap-6"> -->
        <form id="form-upload-csv" class="grid grid-cols-1 md:grid-cols-2 gap-6" onsubmit="return false;">
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Upload FAQ .CSV file</span>
                </label>
                <input id="file_csv" name="csv" accept="text/csv" type="file" @change="csvFileChanged" required
                    class="file-input file-input-bordered w-full max-w-xs" />
            </div>
            <!-- </div> -->
        </form>

        <div id="form-actions" class="card-actions justify-start">
            <button class="btn btn-primary" @click="upload">Upload</button>
        </div>
    </div>

    <div v-if="false" id="reupload-csv-ctr" class="space-y-6">
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