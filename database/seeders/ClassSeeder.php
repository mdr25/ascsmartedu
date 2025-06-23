<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\ClassModel;
use App\Models\Mapel;
use App\Models\Bab;
use App\Models\Subbab;
use App\Models\Konten;

class ClassSeeder extends Seeder
{
    public function run()
    {
        $jenjangMap = [
            1 => ['label' => 'SD', 'jumlah' => 6],
            2 => ['label' => 'SMP', 'jumlah' => 3],
            3 => ['label' => 'SMA', 'jumlah' => 3],
        ];

        foreach ($jenjangMap as $jenjangId => $data) {
            $jenjang = $data['label'];
            $jumlahKelas = $data['jumlah'];

            for ($kelas = 1; $kelas <= $jumlahKelas; $kelas++) {
                $class = ClassModel::create([
                    'class_name' => $jenjang . ' Kelas ' . $kelas,
                    'description' => 'Materi untuk ' . $jenjang . ' kelas ' . $kelas,
                    'price' => 250000, // harga tetap
                    'total_student' => 0, // default kosong
                    'jenjang_kelas_id' => $jenjangId,
                    'teacher_id' => null // di-assign nanti oleh admin
                ]);

                // Mata Pelajaran sesuai jenjang
                if ($jenjang === 'SD') {
                    $mapels = ['Matematika', 'Bahasa Indonesia', 'IPA'];
                } elseif ($jenjang === 'SMP') {
                    $mapels = ['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris'];
                } else { // SMA
                    $mapels = ['Matematika', 'Bahasa Indonesia', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Inggris', 'Ekonomi', 'Geografi', 'Sosiologi'];
                }

                foreach ($mapels as $mapel) {
                    $mapelModel = Mapel::create([
                        'classes_id' => $class->id, // disesuaikan dengan nama kolom di DB
                        'nama_mapel' => $mapel
                    ]);

                    for ($i = 1; $i <= 3; $i++) {
                        $bab = Bab::create([
                            'mapel_id' => $mapelModel->id,
                            'nama_bab' => 'Bab ' . $i . ': Topik ' . $i,
                            'order' => $i
                        ]);

                        for ($j = 1; $j <= 2; $j++) {
                            $subbab = Subbab::create([
                                'bab_id' => $bab->id,
                                'judul_subbab' => 'Subbab ' . $j . ' - Penjelasan ' . $j,
                                'order' => $j
                            ]);

                            for ($k = 1; $k <= 2; $k++) {
                                Konten::create([
                                    'judul_konten' => 'Video Materi ' . $k,
                                    'tipe_konten' => 'video',
                                    'konten_url' => 'https://example.com/video-' . Str::slug($mapel) . '-' . $k,
                                    'durasi' => rand(300, 900),
                                    'bab_id' => $bab->id,
                                    'subbab_id' => $subbab->id,
                                    'order' => $k
                                ]);
                            }
                        }
                    }
                }
            }
        }
    }
}
