<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Classes;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClassesPolicy
{
    use HandlesAuthorization;

    /**
     * Menentukan apakah user dapat melihat daftar semua kelas.
     */
    public function viewAny(User $user): bool
    {
        // Semua pengguna terautentikasi bisa melihat daftar kelas
        return true;
    }

    /**
     * Menentukan apakah user dapat melihat detail kelas tertentu.
     */
    public function view(User $user, Classes $class): bool
    {
        // Siswa hanya bisa melihat kelas jika sudah membayar
        if ($user->hasRole('siswa')) {
            return $class->payments()
                ->where('user_id', $user->id)
                ->where('status', 'paid')
                ->exists();
        }

        // Admin dan pengajar bisa melihat semua kelas
        return $user->hasAnyRole(['admin', 'pengajar']);
    }

    /**
     * Menentukan apakah user dapat membuat kelas baru.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'pengajar']);
    }

    /**
     * Menentukan apakah user dapat memperbarui kelas.
     */
    public function update(User $user, Classes $class): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        // Pengajar hanya bisa mengedit kelas yang mereka ajar
        return $user->hasRole('pengajar') && $class->pengajar_id === $user->id;
    }


    /**
     * Menentukan apakah user dapat menghapus kelas.
     */
    public function delete(User $user, Classes $class): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Menentukan apakah user dapat me-restore kelas.
     */
    public function restore(User $user, Classes $class): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Menentukan apakah user dapat menghapus kelas secara permanen.
     */
    public function forceDelete(User $user, Classes $class): bool
    {
        return $user->hasRole('admin');
    }
}
