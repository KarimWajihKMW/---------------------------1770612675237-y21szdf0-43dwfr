// Keep original initialization log
console.log('Akwadra Super Builder Initialized');

// Jordan Governorates Data
const governorates = [
    "عمان", "إربد", "الزرقاء", "البلقاء", "المفرق", 
    "جرش", "عجلون", "مادبا", "الكرك", "الطفيلة", "معان", "العقبة"
];

// Mock Ride Data
const mockRides = [
    { name: "محمد أحمد", from: "عمان", to: "إربد", price: "3.50", seats: 3, rating: 4.8, car: "هيونداي سوناتا", time: "10:00 ص", type: "passenger" },
    { name: "خالد القيسي", from: "الزرقاء", to: "عمان", price: "1.50", seats: 2, rating: 4.5, car: "تويوتا بريوس", time: "08:30 ص", type: "passenger" },
    { name: "سعيد العلي", from: "إربد", to: "عجلون", price: "1.00", seats: 4, rating: 4.9, car: "كيا سيفيا", time: "02:00 م", type: "package" },
    { name: "منى حسن", from: "عمان", to: "العقبة", price: "10.00", seats: 2, rating: 5.0, car: "نيسان ليف", time: "07:00 ص", type: "passenger" },
    { name: "طارق ذيب", from: "مادبا", to: "عمان", price: "2.00", seats: 1, rating: 4.2, car: "فورد فيوجن", time: "09:15 ص", type: "passenger" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Original event listener preserved (legacy support)
    const card = document.querySelector('.card');
    if(card) {
        card.addEventListener('click', () => {
            console.log('تم النقر على البطاقة!');
            alert('أهلاً بك في عالم البناء بدون كود!');
        });
    }

    // Populate Select Inputs
    populateGovernorates();

    // Populate Initial Rides
    renderRides(mockRides);

    // Handle Search Form
    const searchForm = document.getElementById('search-ride-form');
    if(searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fromVal = document.getElementById('search-from').value;
            const toVal = document.getElementById('search-to').value;
            
            showNotification('جاري البحث عن رحلات...', 'info');
            
            // Simulate API delay
            setTimeout(() => {
                const filtered = mockRides.filter(r => 
                    (!fromVal || r.from === fromVal) && 
                    (!toVal || r.to === toVal)
                );
                renderRides(filtered.length > 0 ? filtered : mockRides);
                if(filtered.length === 0) showNotification('لم يتم العثور على نتائج مطابقة، نعرض لك كل الرحلات', 'warning');
                else showNotification(`تم العثور على ${filtered.length} رحلة`, 'success');
            }, 800);
        });
    }
});

// Navigation Logic
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(sectionId);
    target.classList.remove('hidden');
    // Trigger reflow for animation restart if needed
    void target.offsetWidth;
    target.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Helpers
function populateGovernorates() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        // Only populate if empty or just has default placeholder
        if(select.options.length <= 1) {
            governorates.forEach(gov => {
                const option = document.createElement('option');
                option.value = gov;
                option.innerText = gov;
                select.appendChild(option);
            });
        }
    });
}

function renderRides(rides) {
    const container = document.getElementById('results-container');
    if(!container) return;

    container.innerHTML = '';
    
    rides.forEach(ride => {
        const isPackage = ride.type === 'package';
        const icon = isPackage ? 'fa-box' : 'fa-user';
        const typeText = isPackage ? 'توصيل طرد' : 'نقل ركاب';
        const badgeColor = isPackage ? 'bg-orange-100 text-orange-700' : 'bg-indigo-100 text-indigo-700';

        const html = `
            <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-center animate-fade-in-up">
                <div class="flex items-center mb-4 md:mb-0 w-full md:w-auto">
                    <div class="relative">
                        <img src="https://ui-avatars.com/api/?name=${ride.name}&background=random" alt="Driver" class="w-16 h-16 rounded-full border-4 border-white shadow-md">
                        <div class="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div class="mr-4">
                        <div class="flex items-center mb-1">
                            <h4 class="font-bold text-lg text-slate-800 ml-2">${ride.name}</h4>
                            <span class="px-2 py-0.5 rounded-full text-xs font-bold ${badgeColor}">
                                <i class="fas ${icon} ml-1"></i> ${typeText}
                            </span>
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-star text-yellow-400 ml-1"></i>
                            <span>${ride.rating}</span>
                            <span class="mx-2">•</span>
                            <span>${ride.car}</span>
                        </div>
                        <div class="mt-2 flex items-center text-sm font-medium text-indigo-600">
                            <span>${ride.from}</span>
                            <i class="fas fa-arrow-left mx-2 text-xs"></i>
                            <span>${ride.to}</span>
                            <span class="mx-2 text-gray-300">|</span>
                            <span class="text-gray-500">${ride.time}</span>
                        </div>
                    </div>
                </div>
                <div class="text-center md:text-left w-full md:w-auto mt-4 md:mt-0">
                    <div class="text-2xl font-bold text-slate-900 mb-1">${ride.price} <span class="text-sm font-normal text-gray-500">دينار</span></div>
                    <div class="text-xs text-gray-400 mb-3">${isPackage ? 'سعر التوصيل' : 'لكل مقعد'}</div>
                    <button onclick="bookRide('${ride.name}')" class="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                        ${isPackage ? 'طلب توصيل' : 'حجز مقعد'}
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function bookRide(driverName) {
    showNotification(`تم إرسال طلب الحجز للكابتن ${driverName} بنجاح!`, 'success');
}

function publishRide() {
    showNotification('تم نشر رحلتك بنجاح! انتظر طلبات الركاب.', 'success');
    setTimeout(() => {
        showSection('passenger-view'); // Redirect to see it (simulated)
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notif = document.createElement('div');
    
    let colors = 'bg-white border-l-4 border-indigo-500 text-gray-700';
    let icon = 'fa-info-circle text-indigo-500';
    
    if(type === 'success') {
        colors = 'bg-white border-l-4 border-emerald-500 text-gray-700';
        icon = 'fa-check-circle text-emerald-500';
    } else if(type === 'warning') {
        colors = 'bg-white border-l-4 border-yellow-500 text-gray-700';
        icon = 'fa-exclamation-triangle text-yellow-500';
    }

    notif.className = `${colors} p-4 rounded-lg shadow-lg flex items-center min-w-[300px] animate-fade-in-up pointer-events-auto`;
    notif.innerHTML = `
        <i class="fas ${icon} ml-3 text-xl"></i>
        <p class="font-semibold text-sm">${message}</p>
    `;

    container.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(-100%)';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function toggleTheme() {
    // Simple placeholder for theme toggle logic if requested later
    showNotification('سيتم تفعيل الوضع الليلي قريباً!', 'info');
}