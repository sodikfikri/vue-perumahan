<script>
import HistoryHouse from '../components/tabs/HistoryHouse.vue';
import HistoryPayment from '../components/tabs/HistoryPayment.vue';

export default {
    data() {
        return {
            activeTab: 0,
            tabs: [
                { title: 'Riwayat Rumah', component: HistoryHouse },
                { title: 'Riwayat Pembayaran', component: HistoryPayment }
            ]
        }
    },
    methods: {
        changeTab(index) {
            this.activeTab = index;
        }
    }
}
</script>

<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6>Data Riwayat</h6>
        </div>
        <div class="card-body pt-4 p-3">
            <div class="container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                        <button class="nav-link" :class="{ 'active': activeTab === index }" @click="changeTab(index)">{{ tab.title }}</button>
                    </li>
                    <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li> -->
                    <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
                    </li> -->
                </ul>
                <div class="tab-contentmt mt-3" id="myTabContent">
                    <div class="tab-pane fade" :class="{ 'show active': activeTab === index }" :id="'tab-' + index" role="tabpanel" v-for="(tab, index) in tabs" :key="index">
                        <component :is="tab.component"></component>
                    </div>
                    <!-- <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h1>Home Content</h1>
                        <p>This is the content of the Home tab.</p>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <h1>Profile Content</h1>
                        <p>This is the content of the Profile tab.</p>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <h1>Contact Content</h1>
                        <p>This is the content of the Contact tab.</p>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>